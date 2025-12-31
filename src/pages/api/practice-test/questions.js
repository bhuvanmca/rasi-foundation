import { getBalancedQuestions } from '@/data/practiceQuestions';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { count = 15 } = req.query;
        const questionCount = Math.min(Math.max(parseInt(count) || 15, 5), 35);

        // Get balanced random questions (mix of easy, medium, hard)
        const questions = getBalancedQuestions(questionCount);

        // Remove correct answers for security
        const questionsWithoutAnswers = questions.map(q => ({
            id: q.id,
            questionText: q.questionText,
            options: q.options,
            difficulty: q.difficulty,
            topic: q.topic,
        }));

        res.status(200).json({
            success: true,
            data: {
                questions: questionsWithoutAnswers,
                totalQuestions: questionsWithoutAnswers.length,
                duration: questionCount * 2, // 2 minutes per question
                subject: 'Physics',
            },
        });
    } catch (error) {
        console.error('Get practice questions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch practice questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
