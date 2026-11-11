
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import your existing Groq analysis function
from app import analyze_job_description

app = FastAPI(title="AI Portfolio Chatbot API")

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model
class JDRequest(BaseModel):
    job_description: str


# Home route
@app.get("/")
def home():
    return {"message": "AI Portfolio Chatbot API is running!"}


# Job description analysis route
@app.post("/analyze")
def analyze(request: JDRequest):
    try:
        if not request.job_description.strip():
            raise HTTPException(
                status_code=400,
                detail="Job description cannot be empty"
            )

        result = analyze_job_description(request.job_description)

        return {
            "success": True,
            "analysis": result
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
