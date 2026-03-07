import { v4 as uuidv4 } from "uuid";
import { poolPromise, sql } from "../config/db.js"; // Ensure this path matches your project

/**
 * CREATE MEETING
 * Generates a Jitsi link and saves meeting details with Class/Section info
 */
export const createMeeting = async (req, res) => {
    try {
        const { ClassID, SectionID, Subject, TeacherID } = req.body;

        // Validation
        if (!ClassID || !SectionID || !Subject || !TeacherID) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: ClassID, SectionID, Subject, or TeacherID" 
            });
        }

        // 1. Generate a Unique Room Name
        // We strip spaces/special characters from Subject to prevent URL breaks
        const cleanSubject = Subject.replace(/[^a-zA-Z0-9]/g, "");
        const uniqueID = uuidv4().substring(0, 8);
        const roomName = `${cleanSubject}_Class${ClassID}_Sec${SectionID}_${uniqueID}`;
        
        // Construct the public Jitsi Link
        const meetingLink = `https://meet.jit.si/${roomName}`;

        // 2. Insert into SQL Database
        const pool = await poolPromise;
        await pool.request()
            .input("ClassID", sql.Int, ClassID)
            .input("SectionID", sql.Int, SectionID)
            .input("Subject", sql.VarChar(100), Subject)
            .input("TeacherID", sql.Int, TeacherID)
            .input("MeetingName", sql.VarChar(200), roomName)
            .input("MeetingLink", sql.VarChar(500), meetingLink)
            .query(`
                INSERT INTO OnlineMeetings (ClassID, SectionID, Subject, TeacherID, MeetingName, MeetingLink)
                VALUES (@ClassID, @SectionID, @Subject, @TeacherID, @MeetingName, @MeetingLink)
            `);

        // 3. Response with all relevant info
        res.status(201).json({
            success: true,
            message: "Online class scheduled successfully",
            data: {
                ClassID,
                SectionID,
                Subject,
                MeetingLink: meetingLink,
                MeetingName: roomName
            }
        });

    } catch (error) {
        console.error("Error creating meeting:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * GET MEETINGS
 * Retrieves all meetings for a specific Class and Section
 */
export const getMeetingsByClass = async (req, res) => {
    try {
        const { classId, sectionId } = req.params;

        const pool = await poolPromise;
        const result = await pool.request()
            .input("ClassID", sql.Int, classId)
            .input("SectionID", sql.Int, sectionId)
            .query(`
                SELECT 
                    MeetingID, 
                    ClassID, 
                    SectionID, 
                    Subject, 
                    TeacherID, 
                    MeetingName, 
                    MeetingLink, 
                    MeetingDate 
                FROM OnlineMeetings 
                WHERE ClassID = @ClassID AND SectionID = @SectionID 
                ORDER BY MeetingDate DESC
            `);

        res.status(200).json({
            success: true,
            count: result.recordset.length,
            class: classId,
            section: sectionId,
            data: result.recordset
        });

    } catch (error) {
        console.error("Error fetching meetings:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};