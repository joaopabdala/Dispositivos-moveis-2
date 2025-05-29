import { readingsProps } from "../components/Reading";
import {tags} from '../mocks/tags'

export const readings: readingsProps[] = [
    {
        id: 1,
        title: "Phantom Interviewers Over Rivette",
        link: "http://www.dvdbeaver.com/rivette/ok/phantomint.html",
        tag_ids: [1, 2],
        created: new Date("2025-05-04"),
        read_at: new Date("2025-05-05"),
    },
    {
        id: 2,
        title: "Interview with Luc Moullet by John Hughes and Bill Krohn",
        link: "https://kinoslang.blogspot.com/2014/03/interview-with-luc-moullet-by-john.html",
        tag_ids: [1, 3, 4, 5, 6],
        created: new Date("2025-05-04"),
        read_at: null,
    }
]