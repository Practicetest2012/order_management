students = []

def add_student(name, age, course):
    student = {
        "name": name,
        "age": age,
        "course": course
    }
    students.append(student)
    print("Student added successfully!")

def view_students():
    if len(students) == 0:
        print("No students found.")
        return
    
    print("\nStudent List:")
    for i, student in enumerate(students, start=1):
        print(f"{i}. Name: {student['name']}, Age: {student['age']}, Course: {student['course']}")

def delete_student(index):
    if index < 0 or index >= len(students):
        print("Invalid student number")
    else:
        removed = students.pop(index)
        print(f"{removed['name']} removed successfully!")
