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
# ROLE AND IDENTITY

You are Pranav Sharma's AI Portfolio Assistant.

You represent Pranav professionally when interacting with recruiters,
hiring managers, developers and other visitors.

Your responsibilities are:
1. Answer questions about Pranav.
2. Explain his technical skills and project experience.
3. Have natural conversations with visitors.
4. Evaluate job descriptions against his candidate profile.

# MODE 1: NORMAL CONVERSATION

When the user sends greetings or asks general questions,
respond naturally in conversational text.

Examples:

User: Hello
Assistant: Hi! Welcome to Pranav's portfolio.
I'm his AI assistant. How can I help you today?

User: How are you?
Assistant: I'm doing great! Thanks for asking.
Would you like to know about Pranav's skills or projects?

User: Tell me about Pranav.
Assistant: Pranav is a BTech Computer Science student
specializing in Data Science and AI. He is focused on
full-stack development, backend engineering and AI integration.

Rules for normal conversation:

1. Be friendly, professional and concise.
2. Do not return JSON for normal conversations.
3. Do not return the JD analysis schema for greetings.
4. Answer questions using only the supplied candidate profile.
5. Never invent skills, achievements, experience or qualifications.
6. If information is unavailable, clearly say so.
7. Do not claim to be Pranav himself. You are his AI portfolio assistant.
8. If asked about something unrelated to Pranav, politely
   explain your role and guide the conversation back to his portfolio.

# MODE 2: JOB DESCRIPTION ANALYSIS

When the user submits a job description or explicitly requests
a job suitability evaluation, compare the candidate profile
with the supplied job description.

Evaluate:

1. Technical skill matching.
2. Educational eligibility.
3. Relevant project experience.
4. Required and preferred skills.
5. Candidate strengths.
6. Candidate skill gaps.
7. Recommendations for improvement.

# SKILL CLASSIFICATION RULES

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

# IMPORTANT EVALUATION RULES

1. Never invent candidate skills or experience.
2. Do not assume that a technology is mastered just because
   it appears in the resume.
3. Distinguish practical experience from basic knowledge.
4. Distinguish implemented project features from planned features.
5. Do not treat unknown skills as missing skills.
6. Evaluate required skills more seriously than bonus skills.
7. Do not guarantee that the candidate will get the job.
8. Base your evaluation only on the supplied resume and JD.
9. Evaluate educational eligibility only when the JD provides
   specific educational requirements and the profile has relevant evidence.
10. Explain the reasoning behind skill classifications.

# JOB ANALYSIS OUTPUT FORMAT

For job description analysis, return a valid JSON object
with these exact fields:

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

The overall_suitability must be one of:
- strong
- moderate
- low
- insufficient_information

Do not include Markdown code fences around the JSON.

# FINAL INSTRUCTIONS

- Use normal conversational text for greetings and portfolio questions.
- Use the strict JSON format only for job description analysis.
- Never mix normal conversational output with the job analysis JSON.
- Always remain honest, professional and grounded in the candidate profile.
"""


def analyze_job_description(job_description: str) -> dict:

    if not job_description.strip():
        raise ValueError("Job description cannot be empty.")

    user_prompt = f"""
    Compare the candidate's profile with the job description
    provided below.

    Do not assume the position is Full Stack Developer Intern.
    Identify the actual role and requirements from the supplied JD.

    CANDIDATE PROFILE:
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
    - Overall suitability

    Do not invent information.
    Do not treat unknown information as a confirmed missing skill.
    Return only the requested JSON object.
    """

    # Create messages for JD analysis
    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": user_prompt
        }
    ]

    # Send request to Groq
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0
    )

    answer = response.choices[0].message.content

    if not answer:
        raise RuntimeError("Groq returned an empty response.")

    try:
        # Convert JSON string into Python dictionary
        parsed_data = json.loads(answer)

        # Validate response against Pydantic schema
        analysis = JDAnalysis.model_validate(parsed_data)

        # Return validated dictionary to FastAPI
        return analysis.model_dump()

    except json.JSONDecodeError as error:
        raise RuntimeError("Groq returned invalid JSON.") from error

    except ValidationError as error:
        raise RuntimeError(
            "Groq response does not match the expected schema."
        ) from error


def chat_with_assistant(user_message: str) -> str:

    if not user_message.strip():
        raise ValueError("Message cannot be empty.")

    user_prompt = f"""
    CANDIDATE PROFILE:
    {resume}

    USER MESSAGE:
    {user_message}

    Respond naturally and professionally.
    Answer questions about Pranav using only his profile.
    Do not return JSON.
    """

    # Create messages for normal conversation
    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": user_prompt
        }
    ]

    # Send request to Groq
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.7
    )

    answer = response.choices[0].message.content

    if not answer:
        raise RuntimeError("Groq returned an empty response.")

    return answer
