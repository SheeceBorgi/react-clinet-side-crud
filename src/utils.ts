export const formatDobToAge = (dob: string) => {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
};

export const ageToDob = (age: string): string => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = currentYear - Number(age);
    const birthMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const birthDay = ('0' + currentDate.getDate()).slice(-2);
    const formattedDOB = birthYear + '-' + birthMonth + '-' + birthDay; //Using Today's Month and Day due to calculating DOB from Age
    return formattedDOB.toString();
}

export const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");
    return { firstName, lastName };
}