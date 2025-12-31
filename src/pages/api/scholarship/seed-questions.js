import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';

// Sample questions for seeding the database
const sampleQuestions = {
    Physics: [
        {
            questionText: "What is the SI unit of force?",
            options: [
                { label: 'A', text: 'Joule' },
                { label: 'B', text: 'Newton' },
                { label: 'C', text: 'Watt' },
                { label: 'D', text: 'Pascal' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following is a vector quantity?",
            options: [
                { label: 'A', text: 'Speed' },
                { label: 'B', text: 'Mass' },
                { label: 'C', text: 'Velocity' },
                { label: 'D', text: 'Temperature' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The acceleration due to gravity on Earth's surface is approximately:",
            options: [
                { label: 'A', text: '9.8 m/s²' },
                { label: 'B', text: '10.8 m/s²' },
                { label: 'C', text: '8.9 m/s²' },
                { label: 'D', text: '11.2 m/s²' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
        {
            questionText: "Light travels fastest in:",
            options: [
                { label: 'A', text: 'Water' },
                { label: 'B', text: 'Glass' },
                { label: 'C', text: 'Vacuum' },
                { label: 'D', text: 'Air' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The phenomenon of bending of light when it passes from one medium to another is called:",
            options: [
                { label: 'A', text: 'Reflection' },
                { label: 'B', text: 'Refraction' },
                { label: 'C', text: 'Diffraction' },
                { label: 'D', text: 'Dispersion' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "What is the unit of electric current?",
            options: [
                { label: 'A', text: 'Volt' },
                { label: 'B', text: 'Ohm' },
                { label: 'C', text: 'Ampere' },
                { label: 'D', text: 'Watt' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following is used to measure atmospheric pressure?",
            options: [
                { label: 'A', text: 'Thermometer' },
                { label: 'B', text: 'Barometer' },
                { label: 'C', text: 'Hydrometer' },
                { label: 'D', text: 'Manometer' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The phenomenon of splitting of white light into seven colours is called:",
            options: [
                { label: 'A', text: 'Reflection' },
                { label: 'B', text: 'Refraction' },
                { label: 'C', text: 'Dispersion' },
                { label: 'D', text: 'Scattering' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "Which law states that the current through a conductor is directly proportional to the voltage?",
            options: [
                { label: 'A', text: "Newton's Law" },
                { label: 'B', text: "Ohm's Law" },
                { label: 'C', text: "Faraday's Law" },
                { label: 'D', text: "Boyle's Law" },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The unit of power is:",
            options: [
                { label: 'A', text: 'Joule' },
                { label: 'B', text: 'Newton' },
                { label: 'C', text: 'Watt' },
                { label: 'D', text: 'Hertz' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
    ],
    Chemistry: [
        {
            questionText: "What is the atomic number of Carbon?",
            options: [
                { label: 'A', text: '4' },
                { label: 'B', text: '6' },
                { label: 'C', text: '8' },
                { label: 'D', text: '12' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which gas is known as laughing gas?",
            options: [
                { label: 'A', text: 'Carbon dioxide' },
                { label: 'B', text: 'Nitrogen' },
                { label: 'C', text: 'Nitrous oxide' },
                { label: 'D', text: 'Oxygen' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The pH value of pure water is:",
            options: [
                { label: 'A', text: '0' },
                { label: 'B', text: '7' },
                { label: 'C', text: '14' },
                { label: 'D', text: '1' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which element is present in all organic compounds?",
            options: [
                { label: 'A', text: 'Oxygen' },
                { label: 'B', text: 'Nitrogen' },
                { label: 'C', text: 'Carbon' },
                { label: 'D', text: 'Hydrogen' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The chemical formula of common salt is:",
            options: [
                { label: 'A', text: 'NaCl' },
                { label: 'B', text: 'KCl' },
                { label: 'C', text: 'CaCl₂' },
                { label: 'D', text: 'MgCl₂' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following is an inert gas?",
            options: [
                { label: 'A', text: 'Oxygen' },
                { label: 'B', text: 'Nitrogen' },
                { label: 'C', text: 'Helium' },
                { label: 'D', text: 'Hydrogen' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The process of conversion of solid to gas without passing through liquid state is called:",
            options: [
                { label: 'A', text: 'Evaporation' },
                { label: 'B', text: 'Sublimation' },
                { label: 'C', text: 'Condensation' },
                { label: 'D', text: 'Vaporization' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "Rusting of iron is an example of:",
            options: [
                { label: 'A', text: 'Physical change' },
                { label: 'B', text: 'Chemical change' },
                { label: 'C', text: 'No change' },
                { label: 'D', text: 'Nuclear change' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The hardest natural substance is:",
            options: [
                { label: 'A', text: 'Gold' },
                { label: 'B', text: 'Iron' },
                { label: 'C', text: 'Diamond' },
                { label: 'D', text: 'Platinum' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Which acid is present in lemon?",
            options: [
                { label: 'A', text: 'Acetic acid' },
                { label: 'B', text: 'Citric acid' },
                { label: 'C', text: 'Oxalic acid' },
                { label: 'D', text: 'Tartaric acid' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
    ],
    Mathematics: [
        {
            questionText: "What is the value of π (pi) up to two decimal places?",
            options: [
                { label: 'A', text: '3.12' },
                { label: 'B', text: '3.14' },
                { label: 'C', text: '3.16' },
                { label: 'D', text: '3.18' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The derivative of x² is:",
            options: [
                { label: 'A', text: 'x' },
                { label: 'B', text: '2x' },
                { label: 'C', text: 'x²' },
                { label: 'D', text: '2' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "What is the sum of angles in a triangle?",
            options: [
                { label: 'A', text: '90°' },
                { label: 'B', text: '180°' },
                { label: 'C', text: '270°' },
                { label: 'D', text: '360°' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "log₁₀(100) equals:",
            options: [
                { label: 'A', text: '1' },
                { label: 'B', text: '2' },
                { label: 'C', text: '10' },
                { label: 'D', text: '100' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "The integral of 2x is:",
            options: [
                { label: 'A', text: 'x²' },
                { label: 'B', text: 'x² + C' },
                { label: 'C', text: '2x² + C' },
                { label: 'D', text: '2' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "sin²θ + cos²θ equals:",
            options: [
                { label: 'A', text: '0' },
                { label: 'B', text: '1' },
                { label: 'C', text: '2' },
                { label: 'D', text: 'tan²θ' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The quadratic formula gives the solutions of ax² + bx + c = 0 as:",
            options: [
                { label: 'A', text: 'x = (-b ± √(b²-4ac)) / 2a' },
                { label: 'B', text: 'x = (b ± √(b²-4ac)) / 2a' },
                { label: 'C', text: 'x = (-b ± √(b²+4ac)) / 2a' },
                { label: 'D', text: 'x = (-b ± √(b²-4ac)) / a' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "What is 5! (5 factorial)?",
            options: [
                { label: 'A', text: '25' },
                { label: 'B', text: '60' },
                { label: 'C', text: '120' },
                { label: 'D', text: '720' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The area of a circle with radius r is:",
            options: [
                { label: 'A', text: 'πr' },
                { label: 'B', text: '2πr' },
                { label: 'C', text: 'πr²' },
                { label: 'D', text: '2πr²' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "If a + b = 10 and ab = 21, then a² + b² equals:",
            options: [
                { label: 'A', text: '58' },
                { label: 'B', text: '79' },
                { label: 'C', text: '100' },
                { label: 'D', text: '121' },
            ],
            correctAnswer: 'A',
            difficulty: 'hard',
        },
    ],
    Botany: [
        {
            questionText: "Photosynthesis occurs in which part of the plant cell?",
            options: [
                { label: 'A', text: 'Mitochondria' },
                { label: 'B', text: 'Chloroplast' },
                { label: 'C', text: 'Nucleus' },
                { label: 'D', text: 'Ribosome' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which pigment gives plants their green color?",
            options: [
                { label: 'A', text: 'Carotene' },
                { label: 'B', text: 'Xanthophyll' },
                { label: 'C', text: 'Chlorophyll' },
                { label: 'D', text: 'Anthocyanin' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The process by which plants lose water through leaves is called:",
            options: [
                { label: 'A', text: 'Respiration' },
                { label: 'B', text: 'Transpiration' },
                { label: 'C', text: 'Guttation' },
                { label: 'D', text: 'Photosynthesis' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The male reproductive part of a flower is called:",
            options: [
                { label: 'A', text: 'Pistil' },
                { label: 'B', text: 'Stamen' },
                { label: 'C', text: 'Ovary' },
                { label: 'D', text: 'Stigma' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following is a nitrogen-fixing bacteria?",
            options: [
                { label: 'A', text: 'Rhizobium' },
                { label: 'B', text: 'E. coli' },
                { label: 'C', text: 'Salmonella' },
                { label: 'D', text: 'Lactobacillus' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "Xylem is responsible for:",
            options: [
                { label: 'A', text: 'Transport of food' },
                { label: 'B', text: 'Transport of water and minerals' },
                { label: 'C', text: 'Photosynthesis' },
                { label: 'D', text: 'Respiration' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The study of fungi is called:",
            options: [
                { label: 'A', text: 'Bacteriology' },
                { label: 'B', text: 'Mycology' },
                { label: 'C', text: 'Virology' },
                { label: 'D', text: 'Phycology' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which hormone is responsible for fruit ripening?",
            options: [
                { label: 'A', text: 'Auxin' },
                { label: 'B', text: 'Gibberellin' },
                { label: 'C', text: 'Ethylene' },
                { label: 'D', text: 'Cytokinin' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "Seeds are formed from:",
            options: [
                { label: 'A', text: 'Petals' },
                { label: 'B', text: 'Ovules' },
                { label: 'C', text: 'Sepals' },
                { label: 'D', text: 'Stamens' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which part of the plant absorbs water from the soil?",
            options: [
                { label: 'A', text: 'Stem' },
                { label: 'B', text: 'Leaves' },
                { label: 'C', text: 'Root hairs' },
                { label: 'D', text: 'Flowers' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
    ],
    Zoology: [
        {
            questionText: "Which is the largest organ in the human body?",
            options: [
                { label: 'A', text: 'Heart' },
                { label: 'B', text: 'Liver' },
                { label: 'C', text: 'Skin' },
                { label: 'D', text: 'Brain' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Red blood cells are produced in:",
            options: [
                { label: 'A', text: 'Heart' },
                { label: 'B', text: 'Liver' },
                { label: 'C', text: 'Bone marrow' },
                { label: 'D', text: 'Spleen' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The powerhouse of the cell is:",
            options: [
                { label: 'A', text: 'Nucleus' },
                { label: 'B', text: 'Mitochondria' },
                { label: 'C', text: 'Ribosome' },
                { label: 'D', text: 'Golgi body' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which blood group is known as the universal donor?",
            options: [
                { label: 'A', text: 'A' },
                { label: 'B', text: 'B' },
                { label: 'C', text: 'AB' },
                { label: 'D', text: 'O' },
            ],
            correctAnswer: 'D',
            difficulty: 'easy',
        },
        {
            questionText: "The functional unit of kidney is:",
            options: [
                { label: 'A', text: 'Neuron' },
                { label: 'B', text: 'Nephron' },
                { label: 'C', text: 'Glomerulus' },
                { label: 'D', text: 'Ureter' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "Insulin is produced by:",
            options: [
                { label: 'A', text: 'Liver' },
                { label: 'B', text: 'Pancreas' },
                { label: 'C', text: 'Kidney' },
                { label: 'D', text: 'Stomach' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "DNA stands for:",
            options: [
                { label: 'A', text: 'Deoxyribonucleic acid' },
                { label: 'B', text: 'Dinucleic acid' },
                { label: 'C', text: 'Deoxyribose nucleic acid' },
                { label: 'D', text: 'None of the above' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
        {
            questionText: "How many pairs of chromosomes are present in humans?",
            options: [
                { label: 'A', text: '21' },
                { label: 'B', text: '22' },
                { label: 'C', text: '23' },
                { label: 'D', text: '24' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The largest cell in the human body is:",
            options: [
                { label: 'A', text: 'Red blood cell' },
                { label: 'B', text: 'Nerve cell' },
                { label: 'C', text: 'Ovum (egg cell)' },
                { label: 'D', text: 'Muscle cell' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "Which vitamin helps in blood clotting?",
            options: [
                { label: 'A', text: 'Vitamin A' },
                { label: 'B', text: 'Vitamin C' },
                { label: 'C', text: 'Vitamin D' },
                { label: 'D', text: 'Vitamin K' },
            ],
            correctAnswer: 'D',
            difficulty: 'medium',
        },
    ],
    Biology: [
        {
            questionText: "The basic unit of life is:",
            options: [
                { label: 'A', text: 'Atom' },
                { label: 'B', text: 'Molecule' },
                { label: 'C', text: 'Cell' },
                { label: 'D', text: 'Tissue' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Which organelle is called the 'suicide bag' of the cell?",
            options: [
                { label: 'A', text: 'Mitochondria' },
                { label: 'B', text: 'Lysosome' },
                { label: 'C', text: 'Ribosome' },
                { label: 'D', text: 'Nucleus' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "Respiration is the process of:",
            options: [
                { label: 'A', text: 'Making glucose' },
                { label: 'B', text: 'Breaking down glucose to release energy' },
                { label: 'C', text: 'Absorbing water' },
                { label: 'D', text: 'Producing oxygen' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Genes are made of:",
            options: [
                { label: 'A', text: 'Proteins' },
                { label: 'B', text: 'Lipids' },
                { label: 'C', text: 'DNA' },
                { label: 'D', text: 'Carbohydrates' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The scientific study of living organisms is called:",
            options: [
                { label: 'A', text: 'Physics' },
                { label: 'B', text: 'Chemistry' },
                { label: 'C', text: 'Biology' },
                { label: 'D', text: 'Geology' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following is not a characteristic of living things?",
            options: [
                { label: 'A', text: 'Growth' },
                { label: 'B', text: 'Reproduction' },
                { label: 'C', text: 'Movement' },
                { label: 'D', text: 'Crystallization' },
            ],
            correctAnswer: 'D',
            difficulty: 'easy',
        },
        {
            questionText: "Evolution is the process of:",
            options: [
                { label: 'A', text: 'Rapid mutation' },
                { label: 'B', text: 'Gradual change over generations' },
                { label: 'C', text: 'Sudden extinction' },
                { label: 'D', text: 'Cloning' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "The process by which organisms better adapted to their environment survive and produce more offspring is called:",
            options: [
                { label: 'A', text: 'Mutation' },
                { label: 'B', text: 'Adaptation' },
                { label: 'C', text: 'Natural selection' },
                { label: 'D', text: 'Inheritance' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The study of heredity is called:",
            options: [
                { label: 'A', text: 'Ecology' },
                { label: 'B', text: 'Genetics' },
                { label: 'C', text: 'Cytology' },
                { label: 'D', text: 'Histology' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Mitosis results in:",
            options: [
                { label: 'A', text: 'Four daughter cells with half the chromosomes' },
                { label: 'B', text: 'Two daughter cells with the same chromosomes' },
                { label: 'C', text: 'One daughter cell' },
                { label: 'D', text: 'No daughter cells' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
    ],
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Check for admin authorization (simple check - in production, use proper auth)
        const { adminKey } = req.body;
        if (adminKey !== 'rasi-admin-seed-2024') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Invalid admin key.',
            });
        }

        // Clear existing questions (optional - for fresh seed)
        // await ScholarshipQuestion.deleteMany({});

        const insertedCounts = {};

        for (const [subject, questions] of Object.entries(sampleQuestions)) {
            const questionsWithSubject = questions.map(q => ({
                ...q,
                subject,
                source: 'RASI Foundation Sample Bank',
                isActive: true,
            }));

            // Check if questions already exist to avoid duplicates
            const existingCount = await ScholarshipQuestion.countDocuments({ subject });

            if (existingCount < 35) {
                // Insert questions multiple times to reach at least 35 per subject
                const needed = 35 - existingCount;
                const toInsert = [];

                while (toInsert.length < needed) {
                    for (const q of questionsWithSubject) {
                        if (toInsert.length >= needed) break;
                        toInsert.push({
                            ...q,
                            _id: undefined, // Ensure new IDs
                        });
                    }
                }

                if (toInsert.length > 0) {
                    await ScholarshipQuestion.insertMany(toInsert);
                }
                insertedCounts[subject] = toInsert.length;
            } else {
                insertedCounts[subject] = 0;
            }
        }

        // Get final counts
        const finalCounts = {};
        for (const subject of Object.keys(sampleQuestions)) {
            finalCounts[subject] = await ScholarshipQuestion.countDocuments({ subject });
        }

        res.status(200).json({
            success: true,
            message: 'Questions seeded successfully',
            inserted: insertedCounts,
            totalQuestions: finalCounts,
        });

    } catch (error) {
        console.error('Seed questions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to seed questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
