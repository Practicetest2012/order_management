students = []

def add_student(name: str, age: int, course: str) -> None:
    """Add a new student to the list."""
    if not name or not course:
        print("Name and course cannot be empty.")
        return
    if age <= 0:
        print("Age must be a positive number.")
        return

    student = {
        "name": name.strip(),
        "age": age,
        "course": course.strip()
    }
    students.append(student)
    print("✅ Student added successfully!")


def view_students() -> None:
    """Display all students."""
    if not students:
        print("No students found.")
        return

    print("\n📋 Student List:")
    for i, student in enumerate(students, start=1):
        print(f"{i}. Name: {student['name']}, Age: {student['age']}, Course: {student['course']}")


def delete_student(index: int) -> None:
    """Delete a student by index (1-based index)."""
    if not students:
        print("No students to delete.")
        return

    # Convert to 0-based index
    index -= 1

    if index < 0 or index >= len(students):
        print("❌ Invalid student number.")
        return

    removed = students.pop(index)
    print(f"🗑️ {removed['name']} removed successfully!")


def main():
    """Main menu-driven program."""
    while True:
        print("\n===== Student Management System =====")
        print("1. Add Student")
        print("2. View Students")
        print("3. Delete Student")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            name = input("Enter name: ")
            try:
                age = int(input("Enter age: "))
            except ValueError:
                print("Age must be a number.")
                continue
            course = input("Enter course: ")
            add_student(name, age, course)

        elif choice == "2":
            view_students()

        elif choice == "3":
            try:
                index = int(input("Enter student number to delete: "))
                delete_student(index)
            except ValueError:
                print("Please enter a valid number.")

        elif choice == "4":
            print("Exiting program. Goodbye!")
            break

        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()