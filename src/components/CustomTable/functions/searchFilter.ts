export function searchFilter<T>(arr: T[], str: string):Array<T> {
    return arr.filter((item) => {
            let isFind = false;
            Object.entries(item).forEach(([key, element]) => {
                if (key !== 'address' && key !== 'keyId' && key !== 'description') {
                    if (String(element).toLowerCase().includes(str.toLowerCase())) {
                        isFind = true;
                    }
                }
            });
            return isFind
        }
    )
}