export async function approveCollaboration(colab: string) {
    try {
      console.log(colab);
      const response = await fetch('/api/approveColaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colab }),
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