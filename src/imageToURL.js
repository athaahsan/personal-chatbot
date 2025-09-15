const imageToURL = async (file) => {
    const res = await fetch('/.netlify/functions/sendSupabaseStorage', {
        method: 'POST',
        body: file,
        headers: {
            'Content-Type': file.type,
            'x-file-name': file.name,
        },
    });

    const json = await res.json();
    return json.url;
}

export default imageToURL;
