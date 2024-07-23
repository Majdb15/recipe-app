import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../base/Button"; 
import './style.css'
const RecipeShare = () => {
  const { id: recipeId } = useParams(); // Get recipe_id from the URL
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch emails from the API
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/emails");
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, []);

  const handleShare = async () => {
    const userId = localStorage.getItem("userID");

    if (!userId || !selectedEmail) {
      alert("Please select an email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/share_recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          recipe_id: recipeId,
          recipient_email: selectedEmail,
        }),
      });

      if (response.ok) {
        alert("Recipe shared successfully!");
      } else {
        alert("Failed to share recipe.");
      }
    } catch (error) {
      console.error("Error sharing recipe:", error);
      alert("An error occurred while sharing the recipe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="recipe-share-container flex column center">
      <h3>Share this Recipe</h3>
      <div>
        <label htmlFor="email-select">Select an Email:</label>
        <select
          id="email-select"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">Select an email</option>
          {emails.map((email, index) => (
            <option key={index} value={email}>
              {email}
            </option>
          ))}
        </select>
      </div>
      <Button  text="Share Recipe" onClick={handleShare} disabled={isSubmitting} />
    </div>
  );
};

export default RecipeShare;
