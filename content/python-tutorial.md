---
title: Python Tutorial
description: A beginner-friendly guide to Python programming.
slug: python-tutorial
date: 11/02/2025
author: Syeda Esha
image: https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
---

# Python Tutorial: A Beginner's Guide

Welcome to this Python tutorial! Python is a powerful and versatile programming language that is easy to learn and widely used across various domains, such as web development, data science, and automation. This guide will help you get started with Python and provide you with a strong foundation.

## Why Learn Python?

- **Beginner-Friendly**: Python's syntax is simple and intuitive.
- **Versatile**: Used in web development, data analysis, AI, and more.
- **Community Support**: A large and active community for help and resources.

## Setting Up Python

### Installing Python

1. Download Python from the [official Python website](https://www.python.org/).
2. Install Python and ensure the "Add Python to PATH" option is checked during installation.

### Writing Your First Python Program

1. Open a text editor or IDE (e.g., VS Code, PyCharm).
2. Create a file named `hello.py` and write the following code:

```python
print("Hello, World!")
```

3. Run the script:

```bash
python hello.py
```

## Python Basics

### Variables and Data Types

Python supports various data types, including integers, floats, strings, and booleans.

```python
# Integer
x = 5

# Float
y = 3.14

# String
name = "Esha"

# Boolean
is_active = True
```

### Input and Output

```python
# Input
name = input("Enter your name: ")

# Output
print("Hello, " + name + "!")
```

### Conditional Statements

```python
age = int(input("Enter your age: "))
if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
```

### Loops

- **For Loop**:

```python
for i in range(5):
    print(i)
```

- **While Loop**:

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## Functions

Functions allow you to organize your code into reusable blocks.

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Esha"))
```

## Data Structures

### Lists

Lists are used to store multiple items in a single variable.

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits)
```

### Dictionaries

Dictionaries store data in key-value pairs.

```python
person = {"name": "Esha", "age": 25}
print(person["name"])
```

### Sets and Tuples

- **Set**:

```python
unique_numbers = {1, 2, 3, 3}
print(unique_numbers)
```

- **Tuple**:

```python
coordinates = (10, 20)
print(coordinates[0])
```

## Object-Oriented Programming (OOP)

Python supports OOP concepts like classes and objects.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

person = Person("Esha", 25)
print(person.greet())
```

## Working with Files

Python makes it easy to read and write files.

```python
# Writing to a file
with open("example.txt", "w") as file:
    file.write("Hello, World!")

# Reading from a file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
```

## Conclusion

This tutorial covered the basics of Python, including variables, control flow, data structures, and file handling. Python is a vast language with endless possibilities, so keep practicing and exploring advanced topics like web frameworks, data analysis, and machine learning.

Happy coding!
