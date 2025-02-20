export const addEmoji = (total, yourScore) => {
    const percentage = (yourScore / total) * 100;
  
    if (percentage === 100) return "🎉🥳 Perfect Score!";
    if (percentage >= 80) return "🔥 Great Job!";
    if (percentage >= 50) return "👍 Not Bad!";
    if (percentage > 0) return "😅 Keep Practicing!";
    return "💀 Better Luck Next Time!";
  };
  