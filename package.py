"""
AWS Commands
"""
# trunk-ignore-all(pylint)
import os
import json
import codecs
import pathlib

    replace_string_in_files(client_name, build_dir, bucket_path, bucket_uri)
    pkg_json = json.load(open(f"{BASE_DIR}/clients/{client_name}/package.json", "r", encoding="utf-8"))
    bucket_uri = f"https://emperia.digital/{bucket_path}"

def replace_string_in_files(client_name:str, directory:str, bucket_path:str, bucket_uri:str):
  directory = "./web-build/static"
  for folder_path, sub_folders, filenames in os.walk(directory):

    # Ignore certain directories
    if pathlib.Path(folder_path).parts[-2] == 'static':
      if pathlib.Path(folder_path).parts[-1] == 'media':
        continue

    for filename in filenames:
      file_path = os.path.join(folder_path, filename)

      try:
        # Try UTF-8 encoding first
        with codecs.open(file_path, 'r', encoding='utf-8') as file:
          filedata = file.read()
      except UnicodeDecodeError:
        # If UTF-8 fails, try ISO-8859-1
        with codecs.open(file_path, 'r', encoding='iso-8859-1') as file:
          filedata = file.read()

      # Replace strings
      filedata = filedata.replace(f"./{bucket_path}", f"/{bucket_path}")
      filedata = filedata.replace(f"/{bucket_path}", bucket_path)
      filedata = filedata.replace(bucket_path, bucket_uri)

      # Write the file out again
      with codecs.open(file_path, 'w', encoding='utf-8') as file:
        file.write(filedata)

      # Remove file hashes
      folder_path = pathlib.Path(folder_path)
      if folder_path.parts[-2] == 'static':
        if folder_path.parts[-1] == 'js':
          if filename.startswith('main'):
            if filename.endswith('.js'):
              new_file_path = os.path.join(folder_path, 'main.js')
              rename_file(client_name, file_path, new_file_path)
            elif filename.endswith('.js.map'):
              new_file_path = os.path.join(folder_path, 'main.js.map')
              rename_file(client_name, file_path, new_file_path)
          elif filename.endswith('.js'):
            new_file_path = os.path.join(folder_path, 'style.js')
            rename_file(client_name, file_path, new_file_path)
          elif filename.endswith('.js.map'):
            new_file_path = os.path.join(folder_path, 'style.js.map')
            rename_file(client_name, file_path, new_file_path)
          else:
            os.remove(file_path)
        elif folder_path.parts[-1] == 'css':
          if filename.endswith('.css'):
            new_file_path = os.path.join(folder_path, 'main.css')
            rename_file(client_name, file_path, new_file_path)
          elif filename.endswith('.css.map'):
            new_file_path = os.path.join(folder_path, 'main.css.map')
            rename_file(client_name, file_path, new_file_path)
          else:
            os.remove(file_path)


def rename_file(client_name:str, file_path:str, new_file_path:str):
  html_path = f"{BASE_DIR}/static/{client_name}/{client_name}.app"
  file_name = pathlib.Path(file_path).name
  new_file_name = pathlib.Path(new_file_path).name

  try:
    with codecs.open(html_path, 'r', encoding='utf-8') as file:
      file_data = file.read()
  except UnicodeDecodeError:
    with codecs.open(html_path, 'r', encoding='iso-8859-1') as file:
      file_data = file.read()

  file_data = file_data.replace(file_name, new_file_name)

  with codecs.open(html_path, 'w', encoding='utf-8') as file:
    file.write(file_data)

  os.rename(file_path, new_file_path)