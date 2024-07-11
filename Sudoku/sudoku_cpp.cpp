#include <bits/stdc++.h>
#define ll long long

using namespace std;
vector<map<char, int>> col(9), row(9), box(9);
bool again(vector<vector<char>> &a)
{
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (a[i][j] == '0')
            {
                for (char k = '1'; k <= '9'; k++)
                {
                    int b = (i / 3) * 3 + j / 3;
                    if (!col[j][k] && !row[i][k] && !box[b][k])
                    {

                        a[i][j] = k;
                        row[i][a[i][j]]++;
                        col[j][a[i][j]]++;
                        box[b][a[i][j]]++;
                        if (again(a))
                            return 1;
                        else
                        {
                            row[i].erase(a[i][j]);
                            col[j].erase(a[i][j]);
                            box[b].erase(a[i][j]);
                            a[i][j] = '0';
                        }
                    }
                }
                return 0;
            }
        }
    }
    return 1;
}

vector<vector<char>> solve(vector<vector<char>> a)
{

    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (a[i][j] != '0')
            {
                col[j][a[i][j]]++;
                row[i][a[i][j]]++;
                int k = (i / 3) * 3 + j / 3;
                box[k][a[i][j]]++;
            }
        }
    }

    int s = 81;
    while (s--)
    {
        for (int j = 0; j < 9; j++)
        {

            for (int i = 0; i < 9; i++)
            {
                if (a[i][j] == '0')
                {
                    vector<char> v;
                    int b = (i / 3) * 3 + j / 3;
                    for (char k = '1'; k <= '9'; k++)
                        if (!col[j][k] && !row[i][k] && !box[b][k])
                            v.push_back(k);

                    if (v.size() == 1)
                    {
                        a[i][j] = v[0];
                        row[i][a[i][j]]++;
                        col[j][a[i][j]]++;
                        box[b][a[i][j]]++;
                    }
                }
            }
        }

        // for(int j=0;j<9;j++)
        // {
        //     map<char,int> m;
        //     for(int i=0;i<9;i++)
        //     {

        //     }
        // }
    }

    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (a[i][j] == '0')
                again(a);
        }
    }

    // for(int i=0;i<9;i++)
    // {
    //     cout<<i<<" -"  ;
    //     for(auto j:box[i])
    //     cout<<j.first<<" ";
    //     cout<<endl;
    // }

    return a;
}

int main()
{
    cout << "Insert the matrix" << endl;
    vector<vector<char>> a(9, vector<char>(9, 0));

    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++)
            cin >> a[i][j];

    vector<vector<char>> ans = solve(a);
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {

            cout << ans[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}