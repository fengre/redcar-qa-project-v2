import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsNotEmpty({ message: 'Query is required' })
  @Matches(
    /\b[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z]{2,}\b/,
    { message: 'Query must contain a valid domain name (e.g., google.com, microsoft.com)' }
  )
  query: string;
} 