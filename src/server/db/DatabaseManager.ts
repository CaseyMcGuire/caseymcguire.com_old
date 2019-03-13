
export default interface DatabaseManager {
  query(text: string, params: any[]): Promise<any[]>;
}