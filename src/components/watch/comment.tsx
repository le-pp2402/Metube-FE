import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function Comments() {
    const comments = [
        {
            id: 1,
            username: 'Phat',
            avatar: 'https://randomuser.me/api/portraits/lego/8.jpg',
            content: 'This is a comment'
        },
        {
            id: 2,
            username: 'Le Phi Phat',
            avatar: 'https://randomuser.me/api/portraits/lego/7.jpg',
            content: 'This is another comment'
        },
        {
            id: 3,
            username: 'User123',
            avatar: '',
            content: 'Great video!'
        }
    ];

    return (
        <div className="space-y-4">
            {comments.map(comment => (
                <Card key={comment.id}>
                    <CardHeader className="flex flex-row items-center space-x-4 p-4">
                        <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.username} />
                            <AvatarFallback>
                                {comment.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold">{comment.username}</h4>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-sm">{comment.content}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}