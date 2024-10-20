const validator = (athleteData, achievements, pictureUrl) => {
  const errors = [];

  // First Name Validation
  if (!athleteData.first_name.trim()) {
    errors.push("First name cannot be empty.");
  } else if (athleteData.first_name.length > 50) {
    errors.push("First name cannot be more than 50 characters.");
  } else if (!/^[A-Za-zÅÄÖåäö\s]+$/.test(athleteData.first_name)) {
    errors.push(
      "First name can only contain letters (A-Z, Å, Ä, Ö) and spaces."
    );
  }

  // Last Name Validation
  if (!athleteData.last_name.trim()) {
    errors.push("Last name cannot be empty.");
  } else if (athleteData.last_name.length > 50) {
    errors.push("Last name cannot be more than 50 characters.");
  } else if (!/^[A-Za-zÅÄÖåäö\s]+$/.test(athleteData.last_name)) {
    errors.push(
      "Last name can only contain letters (A-Z, Å, Ä, Ö) and spaces."
    );
  }

  // Nickname Validation
  if (athleteData.nickname && athleteData.nickname.length > 50) {
    errors.push("Nickname cannot be more than 50 characters.");
  } else if (
    athleteData.nickname &&
    !/^[A-Za-zÅÄÖåäö\s]+$/.test(athleteData.nickname)
  ) {
    errors.push("Nickname can only contain letters (A-Z, Å, Ä, Ö) and spaces.");
  }

  // Birth Date Validation
  if (!athleteData.birth_date) {
    errors.push("Birth date is required.");
  } else if (isNaN(Date.parse(athleteData.birth_date))) {
    errors.push("Birth date must be a valid date.");
  }

  // Weight Validation
  if (!athleteData.weight || isNaN(athleteData.weight)) {
    errors.push("Weight must be a valid decimal number.");
  } else if (athleteData.weight < 40) {
    errors.push("Weight must be at least 40 kg.");
  } else if (athleteData.weight > 200) {
    errors.push("Weight must be less than 200 kg.");
  }

  // Achievements Validation (if provided)
  if (achievements.length > 0) {
    achievements.forEach((achievement, index) => {
      if (!achievement.achievement.trim()) {
        errors.push(`Achievement #${index + 1} cannot be empty.`);
      } else if (achievement.achievement.length > 255) {
        errors.push(`Achievement #${index + 1} cannot be more than 255 characters.`);
      }
    });
  }

  // Picture URL Validation (if provided)
  if (pictureUrl && !isValidUrl(pictureUrl)) {
    errors.push("Picture URL must be a valid web address.");
  }

  // If there are errors, alert them and return false
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  return true; // Validation passed
};

const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return false;
    }
  };

export default validator;
