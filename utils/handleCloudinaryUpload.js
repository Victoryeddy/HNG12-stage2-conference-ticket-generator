export const uploadToCloudinary = async (file) => {
    if (!file) {
        console.error("File is null, cannot upload.");
        return { success: false, error: "No file selected" };
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_BASE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_BASE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to upload");
        }

        localStorage.setItem("url", data.secure_url);
        return { success: true, url: data.secure_url };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
