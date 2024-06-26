# trunk-ignore-all(pylint)
import os
import codecs
import pathlib
from argparse import ArgumentParser
from distutils.dir_util import copy_tree
import shutil
# from core.library import console
# from core.tools.commands import node

# exists - check if path exists
# console - console in and console out commands

BASE_DIR = os.getcwd()


def replace_string_in_files(directory: str, bucket_path: str, bucket_uri: str):
    for folder_path, sub_folders, filenames in os.walk(directory):
        # Ignore certain directories
        if "media" in folder_path:
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
            filedata = filedata.replace(f"../../../", "TEMPORARY-TWO")
            filedata = filedata.replace(f"../../static", "TEMPORARY-ONE")
            filedata = filedata.replace(f"./static", "TEMPORARY-ONE")
            filedata = filedata.replace(f"\"./\"", "TEMPORARY-THREE")
            filedata = filedata.replace(
                "TEMPORARY-ONE", f"{bucket_uri}/static")
            filedata = filedata.replace("TEMPORARY-TWO", f"{bucket_uri}/")
            filedata = filedata.replace(
                "TEMPORARY-THREE", '"' + f"{bucket_uri}/" + '"')

            # Write the file out again
            with codecs.open(file_path, 'w', encoding='utf-8') as file:
                file.write(filedata)

            # Remove file hashes
            folder_path = pathlib.Path(folder_path)
            if 'static' in str(folder_path):
                if 'js' in str(folder_path):
                    if filename.startswith('main'):
                        if filename.endswith('.js'):
                            new_file_path = os.path.join(
                                folder_path, 'main.js')
                            rename_file(file_path, new_file_path)
                        elif filename.endswith('.js.map'):
                            new_file_path = os.path.join(
                                folder_path, 'main.js.map')
                            rename_file(file_path, new_file_path)
                    elif filename.endswith('.js'):
                        new_file_path = os.path.join(folder_path, 'style.js')
                        rename_file(file_path, new_file_path)
                    elif filename.endswith('.js.map'):
                        new_file_path = os.path.join(
                            folder_path, 'style.js.map')
                        rename_file(file_path, new_file_path)
                        # os.remove(file_path)
                elif 'css' in str(folder_path):
                    if filename.endswith('.css'):
                        new_file_path = os.path.join(folder_path, 'main.css')
                        rename_file(file_path, new_file_path)
                    elif filename.endswith('.css.map'):
                        new_file_path = os.path.join(
                            folder_path, 'main.css.map')
                        rename_file(file_path, new_file_path)
                        # os.remove(file_path)


def rename_file(file_path: str, new_file_path: str):
    file_name = pathlib.Path(file_path).name
    new_file_name = pathlib.Path(new_file_path).name

    try:
        with codecs.open(file_path, 'r', encoding='utf-8') as file:
            file_data = file.read()
    except UnicodeDecodeError:
        with codecs.open(file_path, 'r', encoding='iso-8859-1') as file:
            file_data = file.read()

    file_data = file_data.replace(file_name, new_file_name)

    with codecs.open(file_path, 'w', encoding='utf-8') as file:
        file.write(file_data)

    shutil.move(file_path, new_file_path)


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-path", "--path")
    parser.add_argument("-domain", "--domain")

    args = parser.parse_args()
    original_path = "./build"
    copy_path = "./build-copy"
    if os.path.exists(copy_path):
        shutil.rmtree(copy_path)
    copy_tree(original_path, copy_path)

    bucket_path = args.path[1:] if args.path.startswith("/") else args.path
    invalidation_path = bucket_path[:-1] + \
        "/*" if bucket_path.endswith("/") else bucket_path + "/*"
    build_path = copy_path
    domain = args.domain
    bucket_uri = f"{domain}/{bucket_path}"
    replace_string_in_files(build_path, bucket_path, bucket_uri)
