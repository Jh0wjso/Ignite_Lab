import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, Download, Lightning } from "phosphor-react";
import '@vime/core/themes/default.css';
import { gql, useQuery } from "@apollo/client";

interface VideoProps{
    lessonSlug: string
}

const GET_LESSON_BY_SLUG_QUERY = gql`
    query getLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
            title
            id
            description
            teacher {
                name
                bio
                avatarURL
            }
        }
    }
`

interface GetLessonBySlugResponse{
    lesson:{
        title: string;
        id: string;
        description: string;
        teacher: {
            name: string;
            bio: string;
            avatarURL: string;
        }

    }
}

export function Video(props: VideoProps){

    const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
        variables: {
            slug: props.lessonSlug,
        }
    });

    if (!data){
        return (
            <div className="flex-1">
                <p className="font-bold">Loading...</p>
            </div>
        )
    }

    return(
        <div className="flex-1 ">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.id}/>
                        <DefaultUi/>
                    </Player>
                </div>
            </div>

            <div className="p-8 max-h-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            {data.lesson.description}
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                            <img
                            className="h-16 w-16 rounded-full border-2 border-blue-500"
                            src={data.lesson.teacher.avatarURL}
                            />

                            <div className = "leading-relaxed">
                                <span className="font-bold text-2xl block">{data.lesson.teacher.name}</span>
                                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <a href="" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24}/>
                            Comunidade do dicord
                        </a>
                        <a href="" className="p-4 text-sm bg-white border border-blue-500  text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 transition-colors hover:text-white">
                            <Lightning size={24}/>
                            Acesse o desafio
                        </a>
                    </div>

                </div>
                
                <div className = "gap-8 mt-20 grid grid-cols-2">
                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hpver:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <Download size={40}/>
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Material Complementar</strong>
                            <p className="h-full p-6 flex items-center">
                                Acesse o material complementar para acelerar o seu desenvolvimento
                            </p>
                        </div>

                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24}/>
                        </div>
                    </a>

                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hpver:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <Download size={40}/>
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Wallpaper Exclusivos</strong>
                            <p className="h-full p-6 flex items-center">
                                Baixe os wallpapers exclusivos do evento
                            </p>
                        </div>

                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24}/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}