export class ColumnDecimalTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export class ColumnStringToNumTransformer {
  to(data: number): string {
    return data.toString();
  }
  from(data: string): number {
    return +data;
  }
}

export class DecimalMoneyTransformer {
  to(data: number): string {
    return data.toString();
  }
  from(data: string): number {
    return +data;
  }
}

export const dtoNumberTransformer = ({ value }) => +value;