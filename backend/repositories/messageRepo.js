import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const createSubmission = async ({ email, name, message, subject }) => {
  const createdAt = DateTime.now().setZone("Asia/Damascus").toISO();
  try {
    console.log('Attempting to save submission to database:', { email, name, subject, messageLength: message?.length });
    
    const submission = await prisma.submission.create({
      data: { email, name, message, subject: subject || "", created_at: new Date(createdAt) },
    });
    
    console.log("Submission successfully saved to database with ID:", submission.id);
    return submission;
  } catch (error) {
    console.error("Error saving submission to database:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    throw error;
  }
};

export async function getMessages() {
  try {
    console.log('Attempting to retrieve messages from database');
    const messages = await prisma.submission.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    console.log('Messages successfully retrieved from database');
    return messages;
  } catch (error) {
    console.error("Error retrieving messages from database:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    throw error;
  }
}

// Export createSubmission as a named export too
export { createSubmission };

// Keep the default export for backward compatibility
export default createSubmission;
