#!/bin/bash

# Find and rename the module script, nomodule script, and CSS files in the dist directory
# Move the dist directory to the target location
parcel build src/index.html --no-source-maps
dist_dir="dist"
target_dir="../../macaw/mysite/static"

# Read the content of index.html
html_content=$(cat "${dist_dir}/index.html")

# Extract the module script filename from index.html
module_script_regex='<script type="module" src="(.*\.js)"></script>'
if [[ $html_content =~ $module_script_regex ]]; then
    module_script_filename=${BASH_REMATCH[1]}
else
    echo "Module script filename not found in index.html"
    exit 1
fi

# Extract the nomodule script filename from index.html
nomodule_script_regex='<script src="(.*\.js)" nomodule defer></script>'
if [[ $html_content =~ $nomodule_script_regex ]]; then
    nomodule_script_filename=${BASH_REMATCH[1]}
else
    echo "Nomodule script filename not found in index.html"
    exit 1
fi

# Extract the CSS filename from index.html
css_regex='<link href="(.*\.css)" rel="stylesheet">'
if [[ $html_content =~ $css_regex ]]; then
    css_filename=${BASH_REMATCH[1]}
else
    echo "CSS filename not found in index.html"
    exit 1
fi

# Rename the module script file to index.mod.js in the dist directory
module_script_path="${dist_dir}/${module_script_filename}"
new_module_filename="index.mod.js"
new_module_script_path="${dist_dir}/${new_module_filename}"

# Rename the nomodule script file to index.nomod.js in the dist directory
nomodule_script_path="${dist_dir}/${nomodule_script_filename}"
new_nomodule_filename="index.nomod.js"
new_nomodule_script_path="${dist_dir}/${new_nomodule_filename}"

# Rename the CSS file to index.css in the dist directory
css_path="${dist_dir}/${css_filename}"
new_css_filename="index.css"
new_css_path="${dist_dir}/${new_css_filename}"

if [[ -f $module_script_path ]]; then
    mv "$module_script_path" "$new_module_script_path"
    echo "Renamed $module_script_filename to $new_module_filename"
else
    echo "Module script file not found: $module_script_path"
    exit 1
fi

if [[ -f $nomodule_script_path ]]; then
    mv "$nomodule_script_path" "$new_nomodule_script_path"
    echo "Renamed $nomodule_script_filename to $new_nomodule_filename"
else
    echo "Nomodule script file not found: $nomodule_script_path"
    exit 1
fi

if [[ -f $css_path ]]; then
    mv "$css_path" "$new_css_path"
    echo "Renamed $css_filename to $new_css_filename"
else
    echo "CSS file not found: $css_path"
    exit 1
fi

# Move the dist directory to the target location
cp -r "$dist_dir" "$target_dir"
echo "Moved $dist_dir to $target_dir"
