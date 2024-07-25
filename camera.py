import cv2
import numpy as np
from insightface.app import FaceAnalysis
from scipy.spatial.distance import cosine

# Load ArcFace model using FaceAnalysis
app = FaceAnalysis(providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
app.prepare(ctx_id=-1, det_size=(640, 640))

# Load the photo to compare with live cam
photo_path = 'project/public/images/{}'  # 사진 경로
photo = cv2.imread(photo_path)

# Function to detect and align face, and then extract embeddings using ArcFace
def get_face_embedding(image):
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    faces = app.get(rgb_image)
    if len(faces) > 0:
        return faces[0].embedding
    else:
        return None

# Get face embedding for the photo
photo_embedding = get_face_embedding(photo)

if photo_embedding is None:
    print("No face detected in the photo.")
else:
    print("Face detected in the photo.")

# Start video capture from the webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Get face embedding for the current frame
    frame_embedding = get_face_embedding(frame)

    if frame_embedding is not None and photo_embedding is not None:
        # Compare embeddings between the photo and the current frame using cosine similarity
        similarity = 1 - cosine(photo_embedding, frame_embedding)
        matching_rate = similarity * 100  # 매칭률을 퍼센트로 계산

        # 설정한 임계값 이상일 때 매칭 텍스트 표시
        if matching_rate > 55:  # 임계값을 설정합니다.
            text = f"Match: {matching_rate:.2f}%"
        else:
            text = f"Not a Match: {matching_rate:.2f}%"

        # Draw result text on the frame
        cv2.putText(frame, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Live Cam", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
