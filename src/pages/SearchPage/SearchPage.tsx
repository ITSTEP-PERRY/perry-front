import { Typography } from "antd";
import { useSearchParams } from 'react-router';

const { Paragraph, Title } = Typography;

export const SearchPage = () => {
    const [searchParams] = useSearchParams();

    const query = searchParams.get('q') ?? '';

    return (
        <main>
            <Title level={1}>Search</Title>

            <Paragraph>
                Search query: {query || 'No query'}
            </Paragraph>
        </main>
    );
};