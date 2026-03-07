import { brevoClient } from "../config/brevo.js";
import { sql, poolPromise } from "../config/db.js";
import { PendingFeeController } from "../controllers/pendingfee.controller.js";

export const PendingFeeModels = {
    async getPendingFees(payload) {
        const { StudentID, ClassID, SectionID } = payload;

        const pool = await poolPromise;
        const request = pool.request();

        request.input("StudentID", sql.Int, StudentID || null);
        request.input("ClassID", sql.VarChar(50), ClassID || null);
        request.input("SectionID", sql.VarChar(50), SectionID || null);

        const result = await request.execute("PendingFeeReport");

        return result.recordset;
    },


    async sendPendingFeeEmails() {
        try {

            const pool = await poolPromise;
            // 1️⃣ Call your stored procedure
            const result = await pool.request().execute("PendingFeeReport_AllStudents");

            const allStudents = result.recordset;
            // 2️⃣ Filter:
            // - Pending > 5000
            // - Not already sent fee email
            const filteredStudents = [];

            for (const student of allStudents) {
                if (student.TotalPending < 25000) {

                    const alreadySent = await pool.request()
                        .input("StudentID", sql.Int, student.StudentID)
                        .query(`
                                SELECT 1 FROM EmailNotificationLog
                                WHERE StudentID = @StudentID
                                AND Type = 'FEE'
                            `);

                    if (!alreadySent.recordset.length) {
                        filteredStudents.push(student);
                    }
                }

                if (filteredStudents.length === 50) break; // max 50
            }

            if (!filteredStudents.length) {
                return { success: true, message: "No students left for fee reminder." };
            }

            // 3️⃣ Get Parent Email from Students table
            const finalStudents = [];
            for (const student of filteredStudents) {

                const parent = await pool.request()
                    .input("StudentID", sql.Int, student.StudentID)
                    .query(`
                            SELECT ParentEmail
                            FROM Students
                            WHERE StudentID = @StudentID
                            `);

                if (parent.recordset.length) {
                    finalStudents.push({
                        StudentID: student.StudentID,
                        Name: student.FullName,
                        ParentEmail: parent.recordset[0].ParentEmail,
                        Pending: student.TotalPending
                    });
                }
            }
            // 4️⃣ Send email individually (to include pending amount)
            for (const student of finalStudents) {

                const pool = await poolPromise;
                const result = pool.request()
                    .input("StudentID", sql.Int, student.StudentID || null)
                    .execute("PendingFeeReport");

                const Data = await result;
                // console.log('data',Data.recordset)
                const feeRowsHtml = Data.recordset
                    .map(
                        (f) => `
                            <tr>
                                <td style="padding:8px;border:1px solid #ddd;">${f.FeeType}</td>
                                <td style="padding:8px;border:1px solid #ddd;">₹${f.TotalFee}</td>
                                <td style="padding:8px;border:1px solid #ddd;">₹${f.PaidAmount}</td>
                                <td style="padding:8px;border:1px solid #ddd;color:#d9534f;">
                                ₹${f.PendingAmount}
                                </td>
                            </tr>
                            `
                            )
                            .join("");

    
                await brevoClient.transactionalEmails.sendTransacEmail({
                    sender: {
                        email: "noreply@webbuild.shop",
                        name: "Preschool School",
                    },
                    subject: "Detailed Pending Fee Statement",
                    htmlContent: `
                    <div style="font-family: Arial, sans-serif; line-height:1.6;">
                        
                        <p><strong>Dear Parent/Guardian 👋,</strong></p>

                        <p>
                        Below is the detailed fee statement for 
                        <strong>${student.Name}</strong>.
                        </p>

                        <table style="border-collapse: collapse; width: 100%; margin-top:15px;">
                        <thead>
                            <tr style="background-color:#f2f2f2;">
                            <th style="padding:8px;border:1px solid #ddd;">Fee Type</th>
                            <th style="padding:8px;border:1px solid #ddd;">Total Fee</th>
                            <th style="padding:8px;border:1px solid #ddd;">Paid</th>
                            <th style="padding:8px;border:1px solid #ddd;">Pending</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${feeRowsHtml}
                        </tbody>
                        </table>

                        <p style="margin-top:15px;">
                        <strong>Total Pending Amount: 
                        <span style="color:#d9534f;">₹${student.Pending}</span>
                        </strong>
                        </p>

                        <p>
                        Kindly clear the outstanding dues at your earliest convenience.
                        </p>

                        <br/>

                        <p>
                        Warm regards,<br/>
                        School Administration Team<br/>
                        🏫 Preschool
                        </p>

                    </div>
                    `,
                    to: [
                        {
                            email: student.ParentEmail,
                            name: student.Name,
                        },
                    ],
                });

                // 7️⃣ Insert Log
                await pool.request()
                    .input("StudentID", sql.Int, student.StudentID)
                    .query(`
                        INSERT INTO EmailNotificationLog (StudentID, Type, SentDate)
                        VALUES (@StudentID, 'FEE', CAST(GETDATE() AS DATE))
                        `);
            }

            return { success: true, count: finalStudents.length };
            // return { success: true, count: finalStudents.length, students: finalStudents };
        }
        catch (error) {
            console.error("Pending Fee Email Error:", error.message);
            return { success: false, error: error.message };
        }

    },

    async getDefaulterStudents() {
        try {

            const pool = await poolPromise;
            // 1️⃣ Call your stored procedure
            const result = await pool.request().execute("PendingFeeReport_AllStudents");

            const allStudents = result.recordset;
            // 2️⃣ Filter:
            // - Pending > 5000
            // - Not already sent fee email
            const filteredStudents = [];

            for (const student of allStudents) {
                if (student.TotalPending > 9000) {
                    
                        filteredStudents.push(student);
                    
                }

               
            }

            if (!filteredStudents.length) {
                return { success: true, message: "No students left for fee reminder." };
            }

            // 3️⃣ Get Parent Email from Students table
            // const finalStudents = [];
            // for (const student of filteredStudents) {

               

            //     if (parent.recordset.length) {
            //         finalStudents.push({
            //             StudentID: student.StudentID,
            //             Name: student.FullName,
            //             ParentEmail: parent.recordset[0].ParentEmail,
            //             Pending: student.TotalPending
            //         });
            //     }
            // }
            // 4️⃣ Send email individually (to include pending amount)
            let finalStudents ={} ;
            for (const student of filteredStudents) {

                const pool = await poolPromise;
                const result = pool.request()
                    .input("StudentID", sql.Int, student.StudentID || null)
                    .execute("PendingFeeReport");

                const Data = await result;

                console.log('data',Data.recordset)
                const feeFormat = Data.recordset.map((f) => ({"Fee Type":f.FeeType, "Total Fee":f.TotalFee, "Paid Amount":f.PaidAmount, "Pending Amount":f.PendingAmount}) )
                finalStudents[student.FullName] = feeFormat;
                // const feeRowsHtml = Data.recordset
                //     .map(
                //         (f) => `
                //             <tr>
                //                 <td style="padding:8px;border:1px solid #ddd;">${f.FeeType}</td>
                //                 <td style="padding:8px;border:1px solid #ddd;">₹${f.TotalFee}</td>
                //                 <td style="padding:8px;border:1px solid #ddd;">₹${f.PaidAmount}</td>
                //                 <td style="padding:8px;border:1px solid #ddd;color:#d9534f;">
                //                 ₹${f.PendingAmount}
                //                 </td>
                //             </tr>
                //             `
                //             )
                //             .join("");

    
               

              
            }

            return { success: true, count: Object.keys(finalStudents).length, defaulterStudent: finalStudents };
            // return { success: true, count: finalStudents.length, students: finalStudents };
        }
        catch (error) {
            console.error("Pending Fee Email Error:", error.message);
            return { success: false, error: error.message };
        }

    }
}
