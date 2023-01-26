import { Button, ScrollArea } from '@mantine/core'
import Styles from './ResultBar.module.css'

export type SearchResult = Array<{
    ico: string;
    name: string;
    path: string;
}>

type Props = {
    searchResult: SearchResult
}

const ResultBar = (props: Props) => {
    return (
        <ScrollArea type="auto" offsetScrollbars>
            <div className={Styles["result-bar"]}>
                {
                    props.searchResult.map(({ ico, name, path }) => <Button
                        key={name}
                        size='md'
                        color="gray"
                        leftIcon={<img height="30" width="auto" src={ico} alt="" />}
                        onClick={(e) => alert("test")}
                        styles={(theme) => ({
                            inner: {
                                justifyContent: "flex-start"
                            }
                        })}
                    >
                        {name}
                    </Button>)
                }
            </div>
        </ScrollArea>
    )
}

export default ResultBar