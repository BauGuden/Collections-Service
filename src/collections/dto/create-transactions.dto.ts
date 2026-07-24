import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  receiveName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  origin: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  accountNumber: string;

  @IsDecimal(
    { decimal_digits: '0,2' },
    { message: 'total debe ser un número decimal válido' },
  )
  total: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  state: string;
}