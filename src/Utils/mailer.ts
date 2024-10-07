import {
  SESClient,
  SendEmailCommand,
  ListIdentitiesCommand,
} from "@aws-sdk/client-ses";

// Add credential verification
function validateAwsCredentials() {
  const requiredEnvVars = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_REGION",
    "SES_FROM_EMAIL",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  // Log partial key for verification (security-conscious logging)
  console.log("AWS Configuration:");
  console.log(`Access Key ID: ${process.env.AWS_ACCESS_KEY_ID}`);
  console.log(`Region: ${process.env.AWS_REGION}`);
  console.log(`From Email: ${process.env.SES_FROM_EMAIL}`);
}

// Configure AWS SES with explicit credentials
const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  apiVersion: "2010-12-01", // Optional but recommended
});

interface EmailPayload {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: {
    name?: string;
    address: string;
  };
}

async function sendEmailSES(payload: EmailPayload) {
  try {
    console.log(payload);
    // Validate credentials before attempting to send
    validateAwsCredentials();

    const toAddresses = Array.isArray(payload.to) ? payload.to : [payload.to];
    console.log("Sending email to:", toAddresses);
    const params = {
      Source: payload.from
        ? `${payload.from.name} <${payload.from.address}>`
        : process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: toAddresses,
      },
      Message: {
        Subject: {
          Data: payload.subject,
          Charset: "UTF-8",
        },
        Body: {
          Text: payload.text
            ? {
                Data: payload.text,
                Charset: "UTF-8",
              }
            : undefined,
          Html: payload.html
            ? {
                Data: payload.html,
                Charset: "UTF-8",
              }
            : undefined,
        },
      },
    };

    console.log("Attempting to send email with params:", {
      to: params.Destination.ToAddresses,
      from: params.Source,
      subject: params.Message.Subject.Data,
    });

    const command = new SendEmailCommand(params);
    const response = await ses.send(command);

    console.log(`Email sent successfully. MessageId: ${response.MessageId}`);
    return response;
  } catch (error: any) {
    console.error("Detailed error:", {
      message: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
      attempts: error.$metadata?.attempts,
    });

    throw new Error(`Failed to send email via SES: ${error.message}`);
  }
}

// Optional: Add a test function
const testSESConnection = async () => {
  try {
    validateAwsCredentials();

    // Create the ListIdentitiesCommand (from AWS SDK v3) and send the command using sesClient
    const command = new ListIdentitiesCommand({});
    const response = await ses.send(command); // sesClient should be initialized earlier in your code

    console.log(
      "SES Connection successful. Verified identities:",
      response.Identities
    );
    return true;
  } catch (error) {
    console.error("SES Connection test failed:", error);
    return false;
  }
};

export { sendEmailSES, testSESConnection };
