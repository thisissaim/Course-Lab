// Mohammad Saim
// 20COB070

#include <iostream>
#include <stdlib.h>
using namespace std;

class Disk
{
private:
    int tracks[100];
    int size, head_pos;

public:
    void FCFS();
    void SCAN();
    void sort(int size, int tracks[]);
    void LOOK();
};

void Disk::FCFS()
{
    cout << "\n\n***************************FCFS**********************************\n\n";
    cout << "Enter the size of track requests\n";
    cin >> size;
    cout << "Enter the track/cylinder requests\n";
    for (int i = 0; i < size; i++)
    {
        cin >> tracks[i];
    }
    cout << "Enter the start position of Head\n";
    cin >> head_pos;
    int total_head_mov = 0, i;

    total_head_mov += abs(head_pos - tracks[0]); // add first movement from head pos
    cout << head_pos << " --> " << tracks[0] << " ";
    for (i = 1; i < size; i++)
    {
        total_head_mov += abs(tracks[i] - tracks[i - 1]); // calc all other head moves
        cout << " --> " << tracks[i] << " ";
    }
    cout << endl;
    cout << " \nTotal head movement = " << total_head_mov << endl;
}
void Disk::sort(int size, int tracks[])
{
    int i, j, temp;
    for (i = 0; i < size; i++)
    {
        for (j = 0; j < size; j++)
        {
            if (tracks[i] < tracks[j])
            {
                temp = tracks[i];
                tracks[i] = tracks[j];
                tracks[j] = temp;
            }
        }
    }
}
void Disk::SCAN()
{
    cout << "\n\n***************************SCAN**********************************\n\n";
    int index, direction, total_track;
    int i, total_head_mov = 0;

    cout << "Enter total number of tracks/cylinders" << endl;
    cin >> total_track;
    cout << "Enter the size of track requests\n";
    cin >> size;
    cout << "Enter the track/cylinder requests\n";
    for (int i = 0; i < size; i++)
    {
        cin >> tracks[i];
    }
    cout << "Enter the start position of Head\n";
    cin >> head_pos;
    cout << "\n Enter the direction of Head \n 1 - Right/Higher \n 0 - Left/Lower" << endl;
    cin >> direction;
    Disk::sort(size, tracks);

    i = 0;
    while (head_pos >= tracks[i]) // index of req just lesser than head_pos
    {
        index = i;
        i++;
    }
    cout << endl;
    cout << head_pos << " --> ";
    if (direction == 1) // Right/Higher
    {
        Disk::sort(size, tracks);
        for (i = index + 1; i < size; i++) // from track greater than head_pos
        {
            cout << " --> " << tracks[i];
            total_head_mov += abs(head_pos - tracks[i]); // if negative, returns absolute value
            head_pos = tracks[i];
        }
        total_head_mov += abs(head_pos - (total_track - 1)); // add head_mov of end of disk cylinder
        cout << " --> " << total_track - 1;
        head_pos = total_track - 1;  // place head pos at end of disk
        for (i = index; i >= 0; i--) // reverse
        {
            cout << " --> " << tracks[i];
            total_head_mov += abs(head_pos - tracks[i]);
            head_pos = tracks[i];
        }
    }
    else // LEFT/LOWER
    {
        Disk::sort(size, tracks);
        for (i = index; i >= 0; i--) // from nearest left of head_pos to start(0)
        {
            cout << " --> " << tracks[i];
            total_head_mov += abs(head_pos - tracks[i]);
            head_pos = tracks[i];
        }
        total_head_mov += abs(head_pos - 0); // add head mov for start of disk
        head_pos = 0;
        cout << " --> 0 ";
        for (i = index + 1; i < size; i++) // from req greater than head_pos
        {
            cout << " --> " << tracks[i];
            total_head_mov += abs(head_pos - tracks[i]);
            head_pos = tracks[i];
        }
    }

    cout << "\n\n Total Head Movement = " << total_head_mov << endl;
}

void Disk::LOOK()
{
    cout << "\n\n***************************LOOK**********************************\n\n";
    int index, direction, total_track;
    int i, total_head_mov = 0;

    cout << "Enter total number of tracks" << endl;
    cin >> total_track;
    cout << "Enter the size of waiting queue\n";
    cin >> size;
    cout << "Enter the track/cylinder requests\n";
    for (int i = 0; i < size; i++)
    {
        cin >> tracks[i];
    }
    cout << "Enter the start position of the Head\n";
    cin >> head_pos;
    cout << "\n Enter the direction of the Head \n 1 - Right/Higher \n 0 - Left/Lower" << endl;
    cin >> direction;
    Disk::sort(size, tracks);

    for (i = 0; i < size; i++)
    {
        if (head_pos < tracks[i]) // take index of req just larger than head_pos
        {
            index = i;
            break;
        }
    }
    // cout << "\nIndex :" << index << endl;
    cout << endl;
    cout << head_pos << " --> ";
    if (direction == 1) // Higher or Right
    {
        for (i = index; i < size; i++) // go till last request
        {
            cout << " --> " << tracks[i];
            total_head_mov = total_head_mov + abs(tracks[i] - head_pos);
            head_pos = tracks[i];
        }
        // reverse
        for (i = index - 1; i >= 0; i--) // from insex less tha head_pos go till lowest req
        {
            cout << " --> " << tracks[i];
            total_head_mov = total_head_mov + abs(tracks[i] - head_pos);
            head_pos = tracks[i];
        }
    }
    else // LEFT or LOWER
    {
        for (i = index - 1; i >= 0; i--)
        {
            cout << " --> " << tracks[i];
            total_head_mov = total_head_mov + abs(tracks[i] - head_pos);
            head_pos = tracks[i];
        }
        for (i = index; i < size; i++)
        {
            cout << " --> " << tracks[i];
            total_head_mov = total_head_mov + abs(tracks[i] - head_pos);
            head_pos = tracks[i];
        }
    }
    cout << "\n\n Total Head Movement = " << total_head_mov << endl;
}

int main()
{
    Disk d = Disk();
    cout << "\n\t\t\t\t DISK SCHEDULING ALGORITHMS : FCFS | SCAN | LOOK\t\t\t\t\n ";
    cout << "\n\t\t\t\t Enter 1 for FCFS | 2 for SCAN | 3 for LOOK\t\t\t\t\n";
    int choice;
    cin >> choice;
    switch (choice)
    {
    case 1:
        d.FCFS();
        break;
    case 2:
        d.SCAN();
        break;
    case 3:
        d.LOOK();
        break;
    default:
        cout << "\n Wrong Choice Input\n";
    }

    return 0;
}
// 98 183 37 122 14 124 65 67 FCFS and SCAN