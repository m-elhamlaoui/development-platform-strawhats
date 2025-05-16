export async function addFileToCategory(category: string, fileId: number) {
    try {
      console.log(category, fileId);
      const response = await fetch('/api/addFileToCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, fileId }),
        credentials: 'include'
      });
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding new departement:', error);
      return null;
    }
  } 