export function det(a: number[][]): number {
    const n = a.length;
    if (n == 1) {
        return a[0][0];
    }
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let b = new Array(n - 1)
            .fill(0)
            .map(() =>
                new Array(n - 1).fill(0)
            );
        for (let j = 1; j < n; j++) {
            for (let k = 0; k < n; k++) {
                if (k < i) {
                    b[j - 1][k] = a[j][k];
                } else if (k > i) {
                    b[j - 1][k - 1] = a[j][k];
                }
            }
        }
        sum += a[0][i] * Math.pow(-1, i) * det(b);
    }
    return sum;
}

export function latex(a: number[][]): string {
    let s: string = "\\begin{bmatrix}"

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            s += a[i][j] + "&";
        }
        s = s.slice(0, -1) + "\\\\";
    }

    s = s.slice(0, -2) + "\\end{bmatrix}";
    return s;
}

export function detLatex(a: number[][]): string {
    let s: string = "\\begin{vmatrix}"

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            s += a[i][j] + "&";
        }
        s = s.slice(0, -1) + "\\\\";
    }

    s = s.slice(0, -2) + "\\end{vmatrix}";
    return s;
}

export function latexVars(vars: any[]): string {
    let s: string = "\\begin{bmatrix}"
    for (const v in vars) {
        s += vars[v] + "\\\\";
    }
    s = s.slice(0, -2) + "\\end{bmatrix}";
    return s;
}

export function cofactor(matrix: number[][], row: number, col: number): number {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        if (i !== row) {
            result.push(matrix[i].filter((_, index) => index !== col));
        }
    }
    return Math.pow(-1, row + col) * det(result);
}

export function transpose(matrix: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < matrix[0].length; i++) {
        result.push([]);
        for (let j = 0; j < matrix.length; j++) {
            result[i].push(matrix[j][i]);
        }
    }
    return result;
}

export function inverse(matrix: number[][]): number[][] {
    const determinant = det(matrix);
    if (determinant === 0) {
        return matrix;
    }
    return transpose(adjacent(matrix))
        .map(row => row.map(x => x / determinant));
}

export function multiply(matrix: number[][], consts: number[]): number[] {
    const result = matrix.map((row, i) => row.reduce((a, b, j) => a + b * consts[j], 0));
    return result.map(x => Math.round(x * 100000000) / 100000000);
}

export function adjacent(matrix: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        result.push([]);
        for (let j = 0; j < matrix[i].length; j++) {
            result[i].push(cofactor(matrix, i, j));
        }
    }
    return result;
}
