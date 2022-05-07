export function getAgeIndex(userAge) {
    if (10 <= userAge && userAge < 20) return 0;
    else if (20 <= userAge && userAge < 30) return 1;
    else if (30 <= userAge && userAge < 40) return 2;
    else if (40 <= userAge && userAge < 50) return 3;
    else if (50 <= userAge && userAge < 60) return 4;
    else if (60 <= userAge) return 5;
}
