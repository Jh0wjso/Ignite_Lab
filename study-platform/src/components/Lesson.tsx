import { CheckCircle, Lock } from 'phosphor-react';
import { isPast } from 'date-fns'
import { format } from 'date-fns/esm';
import ptBR from 'date-fns/locale/pt-BR';

interface LessonProps{
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class'
}

export function Lesson(props: LessonProps){

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormated = format(props.availableAt, "EEEE' . 'd' de 'MMMM' . 'k'h'mm",{
        locale: ptBR,
    });

    return(
        <a href="#">
            <span className="text-gray-300">
                {availableDateFormated}
            </span>

            <div className="rounded border border-gray-500 p-4 mt-2">
                <header className = "flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                            <CheckCircle size={20}/>
                            Conteudo Liberado
                        </span>
                    ): (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20}/>
                            Em Breve
                        </span>
                    )}
                    
                    <span className = "text-xs rounded px-2 py[2px] text-green-300 border border-green-300">
                        {props.type === 'live' ? 'AO VIVO': 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className="text-gray-200 mt-5 block">
                    {props.title}
                </strong>
            </div>
        </a>
    )
}