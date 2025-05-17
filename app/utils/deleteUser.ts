export async function deleteUser(param: string) {
    try {
      const response = await fetch(`/api/deleteUser/${param}`, {
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