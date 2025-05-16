export async function deleteFile(param: number) {
    try {
      const response = await fetch(`/api/deleteFile/${param}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting file:', error);
      return null;
    }
  } 