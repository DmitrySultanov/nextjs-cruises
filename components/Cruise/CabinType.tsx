import React, { FC } from 'react';
import { Grid, Box, Card, CardContent, Skeleton, Typography } from '@mui/material/';
import styles from '../../styles/Cruises.module.scss';
// @ts-ignore
import ReadMoreReact from 'read-more-react';
import Slider from '../Slider';
import { IType } from '../../types';


interface ITypeProps {
    type: IType
}

const CabinType: FC<ITypeProps> = ({type}) => {
    if(type.description) {
        var text = type.description.replace(/(<([^>]+)>)/ig, '').replace(/&nbsp;/ig, '').replace(/&ndash;/ig, '').replace(/&laquo;/ig, '').replace(/&raquo;/ig, '');
    } else {
        var text = '';
    }

    setTimeout(() => {
        var textGroups = document.getElementsByClassName('display-text-group') as HTMLCollectionOf<HTMLElement>;

        for (let textGroup of textGroups) {
            textGroup.onclick = function(event) {
                let target = event.target as HTMLInputElement;

                if (target.classList.value === 'read-more-button') {
                    RMHandleClick(target)
                } else if(target.classList.value === 'displayed-text') {
                    RMHandleCleaner(target)
                }
            }
        }
    }, 100)
    
    
    function RMHandleClick(target: HTMLElement) {
        const container = target.parentNode as HTMLElement,
              button = `<div class="created-button">Свернуть</div>` as unknown as string;

        container.insertAdjacentHTML('afterend', button);

        const createdButtons = document.querySelectorAll('.created-button') as NodeListOf<HTMLElement>;
        createdButtons.forEach((button) => button.onclick = CRhandleClick)
    }
    
    function CRhandleClick() {
        this.previousElementSibling.click();
        this.remove();
    }

    function RMHandleCleaner(target: HTMLElement) {
        const btn: HTMLElement = target.parentElement!.querySelector('.created-button') as HTMLElement;
        if(btn) btn.remove()
    }
    

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card className={styles.card}>
                <Box className={styles.cardMedia}>
                    {type.photos
                        ?   <Slider photos={type.photos} slidesPerView={1} />
                        :   <Skeleton variant="rectangular" width="100%" height="100%" />
                    }
                </Box>
                <CardContent className={styles.cardContent} sx={{px: 2, py: 1}}>
                    <Box>
                        {type.name
                            ?   <Typography variant="subtitle1" className={styles.CabinTypes_title}>{type.name}</Typography>
                            :   null
                        }
                        <ReadMoreReact text={text} max={150} readMoreText="Смотреть полностью" />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default CabinType;
