// در تابع deleteFilesByExtension به جای fs.unlinkSync این خط را قرار دهید:
// console.log(`[Dry Run] Would delete: ${file}`);

// node deleteFilesByExtension.js

const fs = require('fs');
const path = require('path');

/**
 * Delete files with specific extension in a folder and its subfolders
 * @param {string} folderPath - Path of the target folder
 * @param {string} extension - File extension to delete (e.g. '.tmp')
 * @returns {Promise<{deletedFiles: string[], errorFiles: string[]}>} - List of deleted files and failed deletions
 */
async function deleteFilesByExtension(folderPath, extension) {
    const deletedFiles = [];
    const errorFiles = [];

    try {
        // Resolve to absolute path
        const absolutePath = path.resolve(folderPath);
        
        // Verify folder exists
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`Folder does not exist: ${absolutePath}`);
        }

        // Get all files recursively
        const files = getAllFiles(absolutePath);
        
        // Filter files by extension
        const targetFiles = files.filter(file => path.extname(file).toLowerCase() === extension.toLowerCase());
        
        if (targetFiles.length === 0) {
            console.log(`No files found with extension '${extension}' in ${absolutePath}`);
            return { deletedFiles, errorFiles };
        }

        console.log(`Found ${targetFiles.length} files with extension '${extension}'`);

        // Delete each file
        for (const file of targetFiles) {
            try {
                fs.unlinkSync(file);
                deletedFiles.push(file);
                console.log(`Deleted: ${file}`);
                // console.log(`[Dry Run] Would delete: ${file}`);
            } catch (err) {
                errorFiles.push(file);
                console.error(`Error deleting file ${file}:`, err.message);
            }
        }

        console.log(`Operation completed. Successfully deleted ${deletedFiles.length} files.`);
        if (errorFiles.length > 0) {
            console.warn(`Failed to delete ${errorFiles.length} files.`);
        }

        return { deletedFiles, errorFiles };
    } catch (err) {
        console.error('Error:', err.message);
        return { deletedFiles, errorFiles };
    }
}

/**
 * Recursively get all files in a directory
 * @param {string} dir - Directory path
 * @returns {string[]} - Array of file paths
 */
function getAllFiles(dir) {
    const entries = fs.readdirSync(dir);
    let results = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        
        try {
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                results = results.concat(getAllFiles(fullPath));
            } else {
                results.push(fullPath);
            }
        } catch (err) {
            console.error(`Error processing ${fullPath}:`, err.message);
        }
    }

    return results;
}

// Example usage - modify these parameters
const targetFolder = '.'; // Current directory
const fileExtension = '.tmp'; // File extension to delete

deleteFilesByExtension(targetFolder, fileExtension)
    .then(result => {
        console.log('Final result:', {
            deletedCount: result.deletedFiles.length,
            errorCount: result.errorFiles.length
        });
    })
    .catch(err => {
        console.error('Script error:', err);
    });