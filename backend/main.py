import os
import json
from typing import List, Literal

from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, ValidationError

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing. Add it to your .env file.")

client = Groq(api_key=api_key)

model = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

resume = """
Name: Pranav Sharma
Location: Lucknow, Uttar Pradesh, India

Education:
B.Tech in Computer Science and Engineering
Specialization: Data Science and Artificial Intelligence
University: Shri Ramswaroop Memorial University (SRMU)
Current year: 2nd Year, 3rd Semester
Semester 1 CGPA: 7.62
Semester 2 CGPA: 7.45

Frontend Skills:
- HTML5
- CSS3
- JavaScript
- React.js
- Tailwind CSS
- DOM manipulation
- Asynchronous JavaScript

Backend Skills:
- Node.js
- Express.js
- REST API development
- JWT authentication concepts
- Password hashing with bcrypt
- Middleware and routing
- MVC-style architecture

Databases:
- MongoDB
- Mongoose
- MySQL
- SQL fundamentals

Programming Languages:
- JavaScript
- Python
- C
- C++ (currently learning DSA)

Data Science and AI:
- NumPy
- Pandas
- Matplotlib
- Statistics and Probability fundamentals
- SciPy fundamentals
- Machine Learning fundamentals
- Groq API and LLM integration
- Prompt engineering
- AI agent fundamentals

Developer Tools:
- Git and GitHub
- VS Code
- Postman
- JupyterLab

Projects:

1. College Management System
- Developed a college management application prototype.
- Worked with Node.js and Express.js.
- Planned MongoDB collections for student registration,
  teacher login, attendance, announcements, and classes.
- Explored authentication and QR-based attendance concepts.
- Technologies: HTML, CSS, JavaScript, Node.js,
  Express.js, MongoDB, Mongoose.

2. Flyvora — Airfare Price Index
- Participated in an SIH-related hackathon project.
- Contributed to backend development planning.
- Explored airfare data collection, price analysis,
  and backend API architecture.
- Technologies: React, Node.js, Express.js,
  MongoDB/PostgreSQL concepts, external APIs.

3. CivicProof — Public Information Verification
- Worked on a hackathon solution for detecting
  conflicting and potentially unsafe public information.
- Took responsibility for backend schema design
  and implementation planning.
- Explored evidence comparison, source provenance,
  and audit reports.
- Collaborated with Data Science and Cybersecurity teammates.

Important:
Some technologies are currently being learned.
Some project features were planned or explored rather than
fully implemented. Do not present them as completed work.
"""

job_description = """
Position: Full Stack Developer Intern
Company: TechNova Solutions (Fictional Company)
Work Mode: Remote / Hybrid
Duration: 3–6 Months
Experience: Students / Freshers

Job Overview:
We are looking for a motivated Full Stack Developer Intern
interested in developing modern web applications.

Responsibilities:
1. Develop responsive web interfaces using React.js.
2. Build backend services using Node.js and Express.js.
3. Design and integrate RESTful APIs.
4. Work with MongoDB and MySQL databases.
5. Implement authentication and authorization using JWT.
6. Debug, test, and maintain application code.
7. Collaborate with developers.
8. Use Git and GitHub for version control.
9. Integrate third-party APIs and AI-powered services.
10. Write clean, reusable, maintainable code.

Required Technical Skills:
- HTML5: Required
- CSS3: Required
- JavaScript: Required
- React.js: Required
- Node.js: Required
- Express.js: Required
- MongoDB: Required
- MySQL: Basic knowledge
- REST APIs: Required
- Git and GitHub: Required
- JWT Authentication: Preferred
- Python: Bonus
- AI / LLM API Integration: Bonus

Qualifications:
- Currently pursuing a Bachelor's degree in Computer Science,
  IT, or a related field.
- Understanding of programming fundamentals.
- Knowledge of frontend and backend development.
- Familiarity with database operations.
- Strong debugging and problem-solving abilities.
- Willingness to learn new technologies.

Preferred Qualifications:
- Experience developing full-stack projects.
- Understanding of API integration.
- Familiarity with cloud deployment.
- Basic understanding of AI/LLM applications.
- A GitHub profile demonstrating personal projects.

Compensation:
₹8,000–₹15,000 per month (illustrative stipend).
"""

class SkillMatch(BaseModel):
    skill:str

    status :Literal[
        "matched",
        "partially_matched",
        "missing",
        "unknown"      
    ]

    explanation: str

class JDAnalysis(BaseModel):
    matched_skills: List[SkillMatch]
    partially_matched_skills: List[SkillMatch]
    missing_skills: List[SkillMatch]
    unknown_skills: List[SkillMatch]

    strengths: List[str]
    gaps: List[str]
    recommendations: List[str]

    overall_suitability: Literal[
        "strong",
        "moderate",
        "low",
        "insufficient_information"
    ]

    overall_assessment: str

system_prompt = """
# Role and Identity

You are an expert technical recruiter and candidate evaluation assistant.

Your task is to compare a candidate's resume with a company's job description.

You must evaluate:
1. Technical skill matching.
2. Educational eligibility.
3. Relevant project experience.
4. Required and preferred skills.
5. Candidate strengths.
6. Candidate skill gaps.
7. Recommendations for improvement.

SKILL CLASSIFICATION RULES:

- matched:
  The resume clearly provides evidence that the candidate
  has the requested skill.

- partially_matched:
  The candidate has some relevant knowledge or experience,
  but the evidence does not fully satisfy the requirement.

- missing:
  The job requires the skill, and the resume provides
  enough information to identify a genuine gap.

- unknown:
  The resume does not provide enough information to decide.

IMPORTANT RULES:

1. Never invent candidate skills or experience.
2. Do not assume that a technology is mastered just because
   it appears in the resume.
3. Distinguish practical experience from basic knowledge.
4. Distinguish implemented project features from planned features.
5. Do not treat unknown skills as missing skills.
6. Evaluate required skills more seriously than bonus skills.
7. Do not guarantee that the candidate will get the job.
8. Base your evaluation only on the supplied resume and JD.

Return a valid JSON object with these exact fields:

{
    "matched_skills": [],
    "partially_matched_skills": [],
    "missing_skills": [],
    "unknown_skills": [],
    "strengths": [],
    "gaps": [],
    "recommendations": [],
    "overall_suitability": "moderate",
    "overall_assessment": "Your explanation here"
}

Each skill item must contain:
- skill
- status
- explanation

Do not include Markdown code fences around the JSON.
"""

user_prompt = f"""
You are evaluating a candidate for the Full Stack Developer Intern
position at TechNova Solutions.

Compare the following candidate resume with the job description.

CANDIDATE RESUME:
{resume}

JOB DESCRIPTION:
{job_description}


Provide a detailed but concise evaluation.

Classify each relevant skill into:
- matched
- partially_matched
- missing
- unknown

Also evaluate:
- Candidate strengths
- Skill gaps
- Recommendations for improvement
- Overall suitability for the internship

Remember:
Do not invent information.
Do not treat unknown information as a confirmed missing skill.
Return only the requested JSON object.


"""

message_system={
    "role" : "system",
    "content" : system_prompt
}
message_user={
    "role" : "user",
    "content" : user_prompt
}
response_format={
    "type" : "json_object"
}

messages = [message_system, message_user]

response = client.chat.completions.create(
    model=model,
    messages=messages,
    response_format={"type": "json_object"},
    temperature=0
)

answer = response.choices[0].message.content

try:
    parsed_data = json.loads(answer)

    # FIX 6:
    # Validate the response against our Pydantic model.
    # This checks that the expected fields and data types exist.

    analysis = JDAnalysis.model_validate(parsed_data)

    print("\n========== JOB DESCRIPTION ANALYSIS ==========\n")

    # Display the validated result as formatted JSON.
    print(analysis.model_dump_json(indent=4))

except json.JSONDecodeError:
    print("Error: The AI did not return valid JSON.")
    print(answer)

except ValidationError as error:
    print("Error: The AI response does not match our Pydantic schema.")
    print(error)
    print("\nRaw response:")
    print(answer)