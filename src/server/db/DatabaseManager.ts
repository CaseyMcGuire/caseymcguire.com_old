
export default interface DatabaseManager {
  query(text: string, params: any[], callback: (err: Error | undefined, result?: any[]) => void): void;
}