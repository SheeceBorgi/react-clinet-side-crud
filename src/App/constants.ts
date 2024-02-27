export const gender = {
    male: "Male",
    female: "Female",
    transgender: "Transgender",
    rather_not_say: "Rather not say",
    other: "Other",
};

export interface Celebrity {
    id: number;
    first: string;
    last: string;
    dob: string;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
}

export interface formProps {
    fullName: string;
    age: string;
    gender: string;
    country: string;
    description: string;
}

export interface AccordionItemProps {
    item: Celebrity;
    activeKey: number | null;
    onClick: (index: number) => void;
    currentIndex: number;
    isEdit: boolean;
    onEditClick: () => void;
    onCancel: () => void;
    onSubmit: (formData: formProps) => void;
    deleteHandler: (item: Celebrity) => void;
}

export interface Option {
    value: string;
    label: string;
}

export const alphabetRegexWithSpace = /^[a-zA-Z ]+$/;
export const numberRegex = /^[0-9]+$/;