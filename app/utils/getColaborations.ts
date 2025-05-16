export async function getColaborations() {
    try {
      const response = await fetch('/api/getColaborations', {
        method: 'GET',
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
      console.error('Error geting colabs:', error);
      return null;
    }
  } 