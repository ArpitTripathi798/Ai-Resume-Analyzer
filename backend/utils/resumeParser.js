export const extractSkills = (text = "") => {
    const skills = [
        "javascript",
        "react",
        "node",
        "mongodb",
        "express",
        "python",
        "java"
    ];

    return skills.filter(skill =>
        text.toLowerCase().includes(skill)
    );
};


