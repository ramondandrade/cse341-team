const validator = require("../helpers/validate");

saveQuest = (req, res, next) => {

    // Validation middleware for quest data
    const validationRule = {
        title: 'required|string|max:100',
        description: 'required|string|max:1000',
        difficulty: 'required|in:easy,medium,hard,legendary',
        experienceReward: 'integer|min:0',
        goldReward: 'integer|min:0',
        itemReward: 'string',
        questGiver: 'required|string|max:100',
        location: 'required|string|max:100',
        'requirements.*': 'string',
        'objectives.*.description': 'string|max:200',
        'objectives.*.completed': 'boolean',
        status: 'in:available,in-progress,completed,failed,locked',
        estimatedDuration: 'string|max:50',
        questType: 'in:main,side,daily,weekly,event',
        isRepeatable: 'boolean',
        minimumLevel: 'integer|min:1|max:20'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { saveQuest };