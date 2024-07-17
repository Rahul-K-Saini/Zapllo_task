import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/utils/connectToDB';
import Employee from '@/models/Employee';

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, phoneNumber, company, priority } = await request.json();

        if (!firstName || !lastName || !phoneNumber || !company || !priority) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const employee = new Employee({
            firstName,
            lastName,
            phoneNumber,
            company,
            priority,
        });

        const savedEmployee = await employee.save();

        return NextResponse.json(
            {
                message: "Employee created successfully",
                employee: savedEmployee
            },
            { status: 201 }
        );

    } catch (error) {
        console.log('Error', error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}