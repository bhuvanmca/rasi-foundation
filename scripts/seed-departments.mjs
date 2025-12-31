// Run this script with: node scripts/seed-departments.mjs
import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rasi-foundation';

// Comprehensive college data with departments from official websites
const collegesDepartments = {
    // ===== NAMAKKAL DISTRICT =====
    "K.S. Rangasamy College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.Tech. Information Technology",
        "B.E. Electronics and Communication Engineering",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.E. VLSI Design and Technology",
        "B.E. Mechanical Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Civil Engineering",
        "B.E. Mechatronics Engineering",
        "B.Tech. Computer Science and Business System",
        "B.Tech. Biotechnology",
        "B.Tech. Food Technology",
        "B.Tech. Textile Technology"
    ],
    "Paavai Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (IoT)",
        "B.E. Cyber Security",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Mechatronics Engineering",
        "B.E. Civil Engineering",
        "B.E. Aeronautical Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Robotics & Automation",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Chemical Engineering",
        "B.Tech. Food Technology",
        "B.Tech. Agricultural Engineering"
    ],
    "Selvam College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Biotechnology",
        "B.Tech. AI & Data Science"
    ],
    "CMS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Gnanamani College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Muthayammal Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sengunthar Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Mahendra Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Excel College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "J.K.K. Nattraja College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],

    // ===== SALEM DISTRICT =====
    "Knowledge Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Electronics and Computer Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Computer Science and Business Systems"
    ],
    "R. P. Sarathy Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "AVS Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sri Ganesh Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],

    // ===== ERODE DISTRICT =====
    "Shree Venkateshwara Hi-Tech Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Cyber Security",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Erode Sengunthar Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (IoT)",
        "B.E. Computer Science and Design",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electronics and Instrumentation Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Agricultural Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Chemical Engineering"
    ],
    "Nandha Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Nandha College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Kongu Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Mechatronics Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Food Technology",
        "B.Tech. Textile Technology"
    ],

    // ===== COIMBATORE ZONE =====
    "Karpagam College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. Computer Science and Technology",
        "B.E. Computer Science and Design",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electronics Engineering (VLSI Design)",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Karpagam Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Karpagam Academy of Higher Education": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Nehru Institute of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Nehru Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Dr. NGP Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "SNS College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "SNS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "KGISL Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Coimbatore Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Hindusthan College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Automobile Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Hindustan Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Rathinam Group of Institutions": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Adithya Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "PPG Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sree Sakthi Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "RVS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "United Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "INFO Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "P.A. College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sri Shakthi Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Kathir College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Park College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Akshaya College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "EASA College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Dhanalakshmi Srinivasan College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "JCT College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Arjun College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ]
};

async function seedDepartments() {
    console.log('🚀 Connecting to MongoDB...');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get College model
        const College = mongoose.models.College || mongoose.model('College', new mongoose.Schema({
            name: String,
            location: String,
            district: String,
            code: String,
            note: String,
            departments: [String],
            website: String,
            isActive: Boolean,
            order: Number,
            createdAt: Date,
            updatedAt: Date
        }));

        let updatedCount = 0;
        let notFoundCount = 0;

        for (const [collegeName, departments] of Object.entries(collegesDepartments)) {
            // Find college by partial name match
            const college = await College.findOne({
                name: { $regex: collegeName, $options: 'i' }
            });

            if (college) {
                college.departments = departments;
                college.updatedAt = new Date();
                await college.save();
                console.log(`✅ Updated: ${college.name} (${departments.length} courses)`);
                updatedCount++;
            } else {
                console.log(`⚠️  Not found: ${collegeName}`);
                notFoundCount++;
            }
        }

        console.log('\n========================================');
        console.log(`✅ Updated: ${updatedCount} colleges`);
        console.log(`⚠️  Not found: ${notFoundCount} colleges`);
        console.log('========================================\n');

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedDepartments();
