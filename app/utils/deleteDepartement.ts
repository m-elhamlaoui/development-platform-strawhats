export async function deleteDepartement(param: string) {
    try {
      const response = await fetch(`/api/deleteDepartement/${param}`, {
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
      console.error('Error deleting user:', error);
      return null;
    }
  } 