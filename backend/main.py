import os
import json

# Define a set of human-readable text file extensions
TEXT_EXTENSIONS = {".txt", ".js", ".py", ".c", ".cpp", ".java", ".html", ".css", ".ts"}

def is_human_readable(file_extension):
    """
    Checks if a file extension is considered human-readable text.
    """
    return file_extension.lower() in TEXT_EXTENSIONS

def get_directory_structure(root_dir):
    """
    Recursively generates the directory structure as a dictionary
    including subfolders and their file contents, while ignoring
    non-human-readable files.
    """
    try:
        result = {
            "type": "folder",
            "name": os.path.basename(root_dir),
            "children": []
        }

        for item in os.listdir(root_dir):
            item_path = os.path.join(root_dir, item)
            if os.path.isdir(item_path):
                result["children"].append(get_directory_structure(item_path))
            elif os.path.isfile(item_path):
                file_extension = os.path.splitext(item)[1]
                if not is_human_readable(file_extension):
                    print(f"Ignoring non-human-readable file: {item_path}")
                    continue
                print('Reading File', item_path)
                with open(item_path, "r", encoding="utf-8-sig") as file:
                    file_content = file.read()
                result["children"].append({
                    "type": "file",
                    "name": item,
                    "fileData": file_content,
                    "filePath": item_path  # Add file path attribute
                })

        return result
    except Exception as e:
        print(f"Error while getting Structure: {e}")

def convert_to_json(root_dir):
    """
    Converts the directory structure to a JSON object.
    """
    directory_structure = get_directory_structure(root_dir)
    return json.dumps(directory_structure, indent=4)

# Set your static folder path here
def startReading():
    try:
        working_dir = os.getcwd()
        root_directory = "read_dir"
        os.path.join(working_dir, root_directory)

        if os.path.exists(root_directory):
            json_data = convert_to_json(root_directory)
            with open("directory_structure.json", "w", encoding="utf-8") as json_file:
                json_file.write(json_data)
            print("Directory structure saved as 'directory_structure.json'")
        else:
            print("The specified directory does not exist.")
    except Exception as e:
        print(f"Error While starting {e}")

startReading()
